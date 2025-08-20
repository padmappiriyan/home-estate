import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
    loading:false,
    error:null
}

const userSlice =createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.loading=false;
            state.currentUser=action.payload;
            state.error=null;
        },
        signInFailuer:(state,action)=>{
            state.loading=false,
            state.error=action.payload;
        }
    }

})

//export the action 
export const {signInStart, signInSuccess, signInFailuer}=userSlice.actions;

//export the reducer
export default userSlice.reducer;