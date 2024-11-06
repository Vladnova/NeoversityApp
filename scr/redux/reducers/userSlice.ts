import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типи для початкового стану
interface UserState {
    userInfo: { uid: string; email: string | null; displayName?: string | null; avatar?: string; login?: string } | null;
    avatarPath: string | null;
}

const initialState: UserState = {
    userInfo: null,
    avatarPath: null
};

// Створення slice для користувача
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserInfo(state, action: PayloadAction<UserState['userInfo']>) {
            state.userInfo = action.payload;
        },
        clearUserInfo(state) {
            state.userInfo = null;
        },
        setAvatarPath(state, action: PayloadAction<UserState['avatarPath']>) {
            state.avatarPath = action.payload;
        },
    },
});

// Експорт дій для використання у компонентах
export const { setUserInfo, clearUserInfo, setAvatarPath } = userSlice.actions;

// Експорт ред'юсера для підключення до Store
export default userSlice.reducer;