import {getDownloadURL, ref, uploadBytes, getStorage, deleteObject} from 'firebase/storage';
import uuid from 'react-native-uuid';
import { storage } from '../../config';
import {setAvatarPath} from "../redux/reducers/userSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../redux/store/store";

// Завантажуємо зображення
export const handleImageUpload = async (
    userId: string,
    file: File | Blob,
    fileName: string,
    dirName: string,
    dispatch?: AppDispatch
) => {
    try {

        // Завантажуємо зображення
        const imageRef = await uploadImage(userId, file, fileName, dirName, dispatch);
        // // Отримуємо URL завантаженого зображення
        const imageUrl = await getImageUrl(imageRef);
        return imageUrl;
    } catch (error) {
        console.error('Error uploading image and getting URL:', error);
    }
};

// Функція для отримання URL завантаженого зображення
export const getImageUrl = async (imageRef: any) => {
    const url = await getDownloadURL(imageRef);
    return url;
};

// Функція для завантаження зображення
export const uploadImage = async (userId: string, file: Blob, fileName: string, dirName: string, dispatch?: AppDispatch) => {
    const imagePath = `${dirName}/${userId}/${fileName}-${uuid.v4()}`;
    if(dispatch) {
        dispatch(setAvatarPath(imagePath));
    }

    try {
        const imageRef = ref(storage, imagePath);
        await uploadBytes(imageRef, file);
        return imageRef;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

let imagePath = '';

// Функція для видалення зображення
export const deleteImage = async (path:string) => {
    try {
        const storage = getStorage(); // Отримуємо екземпляр сховища
        const imageRef = ref(storage, path); // Створюємо посилання на зображення

        // Видаляємо файл
        await deleteObject(imageRef);
        console.log("Зображення видалено успішно");
    } catch (error) {
        console.error("Помилка під час видалення зображення:", error);
    }
};