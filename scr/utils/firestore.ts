import {
    doc, getDoc, setDoc, addDoc, collection,
    updateDoc, getDocs, where, query, orderBy } from 'firebase/firestore';
import { db } from '../../config';
import {handleImageUpload} from "./imageUtils";

interface UserData {
    uid: string;
    email: string;
    login?: string;
    avatar?: string;
    displayName?: string;
}

interface Post {
    imageFile?: File;
    fileName?: string;
    name: string;
    location: string;
}

export interface PostResponse {
    id: string;
    imageUrl: string;
    location: string;
    name: string;
    userId: string;
}

interface Comments {
    postId: string,
    userId: string,
    text: string
}



// Функція для додавання документа до колекції
export const addUser = async (userId: string, userData: UserData) => {
    try {
        await setDoc(doc(db, 'users', userId), userData);
        console.log('User added:', userId);
    } catch (error) {
        console.error('Error adding user:', error);
    }
};

// Функція для отримання документа з колекції
export const getUser = async (userId: string) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       return docSnap.data();
    } else {
        console.log('No such document!');
    }
};

// Функція для запису даних користувача у Firestore
export const updateUserInFirestore = async (uid: string, data: any) => {
    try {
        await setDoc(doc(db, 'users', uid), data, { merge: true });
    } catch (error) {
        console.error('Error saving user data to Firestore:', error);
    }
};

// додавання постів
export const addPost = async (userId: string, postData: Post) => {
    try {
        console.log('postData', postData);
        const  {
            imageFile,
            fileName,
            location,
            name
        } = postData;
        // Додаємо пост до колекції posts з userId
        const postRef = await addDoc(collection(db, 'posts'), {
            location,
            name,
            userId, // Додаємо userId до поста
        });

        const postId = postRef.id;

        let imageUrl;

        if(fileName && imageFile){
            imageUrl = await handleImageUpload(postId, imageFile, fileName, 'posts');
        }
        await updateDoc(doc(db, 'posts', postId), {
            imageUrl,
        });
        console.log('Post added for user:', userId);
    } catch (error) {
        console.error('Error adding post:', error);
    }
};

export const getAllPosts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'posts'));

        const posts: PostResponse[] = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() } as PostResponse);
        });

        return posts;
    } catch (error) {
        console.error('Error getting all posts:', error);
        return [];
    }
};

export const getUserPosts = async (userId: string) => {
    try {
        const q = query(collection(db, 'posts'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const posts: PostResponse[] = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() } as PostResponse);
        });

        return posts;
    } catch (error) {
        console.error('Error getting user posts:', error);
        return [];
    }
};


// Функція для додавання коментаря до поста
export const addCommentToPost = async (comments:Comments) => {
    const {postId, userId, text} = comments;
    try {
        // Отримання підколекції коментарів для конкретного поста
        const commentsRef = collection(db, 'posts', postId, 'comments');

        const timestamp = new Date("2024-11-06T03:23:01+02:00");
        const formattedDate = formatDateWithMonthName(timestamp);

        // Додавання нового коментаря
        const docRef = await addDoc(commentsRef, {
            userId,
            text,
            timestamp: formattedDate, // Додаємо timestamp автоматично
        });

        console.log('Comment added with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding comment: ', e);
    }
};

export const getCommentsForPost = async (postId: string) => {
    try {
        // Отримання коментарів з підколекції поста
        const commentsRef = collection(db, 'posts', postId, 'comments');
        const commentsQuery = query(commentsRef, orderBy('timestamp')); // Сортуємо за timestamp
        const querySnapshot = await getDocs(commentsQuery);

        // Отримуємо дані коментарів
        const comments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return comments;
    } catch (e) {
        console.error('Error getting comments: ', e);
        return [];
    }
};


const formatDateWithMonthName = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const monthIndex = date.getMonth(); // Місяць в об'єкті Date (0-11)
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Масив назв місяців
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const monthName = months[monthIndex]; // Отримуємо назву місяця

    return `${day} ${monthName} ${year} | ${hours}:${minutes}`;
};


