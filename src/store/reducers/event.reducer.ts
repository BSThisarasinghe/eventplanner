import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventItem } from "../../pages/home/models/event-list-response.model";
import { User } from "../../pages/home/models/users.model";
import { Post } from "../../pages/home/models/posts.model";
import { Comment } from "../../pages/home/models/comments.model";

interface EventModel {
  eventDetails: EventItem[];
  users: User[];
  posts: Post[];
  comments: Comment[]
}

const eventStore = createSlice({
  name: "event-store",
  initialState: {
    eventDetails: [],
    users: [],
    posts: [],
    comments: []
  } as EventModel,
  reducers: {
    eventFetchSuccess: (state: EventModel, action: PayloadAction<EventItem[]>) => {
      return {
        ...state,
        eventDetails: action.payload
      }
    },
    eventFetchFail: (state: EventModel) => {
      return {
        ...state,
        eventDetails: []
      }
    },
    userFetchSuccess: (state: EventModel, action: PayloadAction<User[]>) => {
      return {
        ...state,
        users: action.payload
      }
    },
    userFetchFail: (state: EventModel) => {
      return {
        ...state,
        users: []
      }
    },
    postsFetchSuccess: (state: EventModel, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload
      }
    },
    postsFetchFail: (state: EventModel) => {
      return {
        ...state,
        posts: []
      }
    },
    commentsFetchSuccess: (state: EventModel, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload
      }
    },
    commentsFetchFail: (state: EventModel) => {
      return {
        ...state,
        comments: []
      }
    }
  },
});

export default eventStore;