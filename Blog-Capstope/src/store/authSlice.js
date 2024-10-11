import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userData:null
}

const authSlice= createSlice({
    name:"auth",                //this property is used to identify the slice of the state in the store
    initialState,                         //this property is used to define the initial state of the slice
    reducers:{
        //these are the actions that can be dispatched to update the state
        login(state,action){
            state.status=true;
            state.userData=action.payload;
        },
        logout(state){
            state.status=false;
            state.userData=null;
        }
    }

})
export const {login,logout}=authSlice.actions;

//we can use this export statement to export the actions and reducer
export default authSlice.reducer;