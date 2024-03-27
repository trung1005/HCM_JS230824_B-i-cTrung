import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apis from "../../apis";

interface Task {
    id: number,
    title: String,
}

interface TaskState {
    data: Task[] | null;
    loading: boolean;
}

let initialState: TaskState = {
    data: null,
    loading: false
}


const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action) => {
            if(state.data){
                state.data.push(action.payload);
            }
        },
        
        deleteTask: (state, action) => {
            if(state.data)
            state.data = state.data?.filter(item => item.id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTask.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchTask.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchTask.rejected, (state) => {
            state.loading = false;
        })
    }
})

const fetchTask = createAsyncThunk(
    'task/fetchTask',
    async () => {
        try{
            const res = await apis.taskApi.getAll()
            console.log("res",res);

            return res.data.data;
        }catch(err){
            console.log(err);
        }
       
    }

)

export const taskReducer = taskSlice.reducer;
export const taskAction = {
    ...taskSlice.actions,
    fetchTask
}