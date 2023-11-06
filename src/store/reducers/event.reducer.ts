import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EventItem } from "../../pages/home/models/event-list-response.model";
import { User } from "../../pages/home/models/users.model";
import { Post } from "../../pages/home/models/posts.model";
import { Comment } from "../../pages/home/models/comments.model";

interface EventModel {
  eventDetails: EventItem[];
  users: User[];
  posts: Post[];
  comments: Comment[];
  postsLoading: boolean;
  commentsLoading: boolean;
}

const eventStore = createSlice({
  name: "event-store",
  initialState: {
    eventDetails: [],
    users: [],
    posts: [],
    comments: [],
    postsLoading: false,
    commentsLoading: false
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
    postsFetchLoading: (state: EventModel) => {
      return {
        ...state,
        postsLoading: true
      }
    },
    postsFetchSuccess: (state: EventModel, action: PayloadAction<Post[]>) => {
      return {
        ...state,
        posts: action.payload,
        postsLoading: false
      }
    },
    postsFetchFail: (state: EventModel) => {
      return {
        ...state,
        posts: [],
        postsLoading: false
      }
    },
    commentsFetchLoading: (state: EventModel) => {
      return {
        ...state,
        commentsLoading: true
      }
    },
    commentsFetchSuccess: (state: EventModel, action: PayloadAction<Comment[]>) => {
      return {
        ...state,
        comments: action.payload,
        commentsLoading: false
      }
    },
    commentsFetchFail: (state: EventModel) => {
      return {
        ...state,
        comments: [],
        commentsLoading: false
      }
    }
  },
});

export default eventStore;