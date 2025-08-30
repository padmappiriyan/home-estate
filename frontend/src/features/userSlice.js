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
            state.loading=false;
            state.error=action.payload;
        },
        updateuserStart:(state)=>{
            state.loading=true;
        },
        updateuserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateuserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;

        }
        ,
        signoutStart:(state)=>{
            state.loading=true;
        },
        signoutSuccess:(state,action)=>{
            state.currentUser = null;
            state.loading=false;
            state.error=null;
        },
        signoutFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;

        }
    }

})

//export the action 
export const {signInStart, signInSuccess, signInFailuer ,updateuserStart ,updateuserSuccess , updateuserFailure ,signoutStart ,signoutSuccess,signoutFailure}=userSlice.actions;

//export the reducer
export default userSlice.reducer;