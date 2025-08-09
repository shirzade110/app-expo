# RTK Query Setup Guide

This project has been configured with RTK Query for efficient data fetching and state management. Here's everything you need to know to use it effectively.

## 📋 What's Already Configured

### 1. Dependencies Installed
- `@reduxjs/toolkit` - Main RTK package with RTK Query
- `react-redux` - React bindings for Redux

### 2. Store Configuration (`app/store.ts`)
- Redux store configured with RTK Query
- API middleware added for caching, invalidation, and polling
- TypeScript types exported (`RootState`, `AppDispatch`)

### 3. Provider Setup (`app/_layout.tsx`)
- Redux Provider wraps the entire app
- Store is available to all components

### 4. Base API Configuration (`app/api/baseApi.ts`)
- Centralized API configuration
- Example endpoints (GET, POST, PUT, DELETE)
- Type definitions for API responses
- Cache invalidation tags

### 5. Example Component (`components/PostsList.tsx`)
- Demonstrates RTK Query hooks usage
- Shows loading states, error handling
- Example of mutations (delete post)

## 🚀 How to Use RTK Query

### Basic Query Hook
```typescript
import { useGetPostsQuery } from '@/app/api/baseApi';

function MyComponent() {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useGetPostsQuery();

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error occurred</Text>;
  
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}
```

### Mutation Hook
```typescript
import { useCreatePostMutation } from '@/app/api/baseApi';

function CreatePost() {
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const handleSubmit = async (postData) => {
    try {
      const result = await createPost(postData).unwrap();
      console.log('Post created:', result);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <TouchableOpacity onPress={handleSubmit} disabled={isLoading}>
      <Text>{isLoading ? 'Creating...' : 'Create Post'}</Text>
    </TouchableOpacity>
  );
}
```

## 🔧 Customizing for Your API

### 1. Update Base URL
Edit `app/api/baseApi.ts`:
```typescript
const BASE_URL = 'https://your-api-domain.com/api';
```

### 2. Add Authentication
Uncomment and modify the auth section in `prepareHeaders`:
```typescript
prepareHeaders: (headers, { getState }) => {
  const token = (getState() as RootState).auth.token;
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  return headers;
},
```

### 3. Add Your Endpoints
Replace the example endpoints with your own:
```typescript
endpoints: (builder) => ({
  getUsers: builder.query<User[], void>({
    query: () => '/users',
    providesTags: ['User'],
  }),
  getUserById: builder.query<User, string>({
    query: (id) => `/users/${id}`,
    providesTags: (result, error, id) => [{ type: 'User', id }],
  }),
  createUser: builder.mutation<User, Partial<User>>({
    query: (userData) => ({
      url: '/users',
      method: 'POST',
      body: userData,
    }),
    invalidatesTags: ['User'],
  }),
}),
```

### 4. Export Your Hooks
```typescript
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
} = api;
```

## 💡 Best Practices

### 1. Use Tags for Cache Invalidation
- Assign `providesTags` to queries
- Use `invalidatesTags` in mutations
- This automatically updates the UI when data changes

### 2. Handle Loading States
```typescript
const { data, isLoading, isFetching, error } = useGetDataQuery();

// isLoading: true only on first fetch
// isFetching: true on any fetch (including background refetch)
```

### 3. Error Handling
```typescript
const { error } = useGetDataQuery();

if (error) {
  if ('status' in error) {
    // RTK Query error
    console.log('API Error:', error.status, error.data);
  } else {
    // Network error
    console.log('Network Error:', error.message);
  }
}
```

### 4. Optimistic Updates
```typescript
const [updatePost] = useUpdatePostMutation();

const handleUpdate = async (id, updates) => {
  try {
    await updatePost({ id, ...updates }).unwrap();
  } catch (err) {
    // Handle error - cache automatically reverts
  }
};
```

## 🎯 Key Features Available

### ✅ Automatic Caching
- Responses are cached automatically
- Same requests won't hit the network again
- Configurable cache times

### ✅ Background Refetching
- Data refetches when window regains focus
- Network reconnection triggers refetch
- Configurable polling intervals

### ✅ Optimistic Updates
- UI updates immediately
- Reverts automatically on error
- No manual rollback needed

### ✅ Request Deduplication
- Multiple components requesting same data = single request
- Automatic request cancellation
- No duplicate network calls

### ✅ Loading States
- Built-in loading indicators
- Fine-grained loading states
- Easy to implement skeleton screens

## 🚀 Getting Started

1. Check out the example in the "Explore" tab
2. Modify `app/api/baseApi.ts` with your API endpoints
3. Update the base URL to point to your backend
4. Start using the generated hooks in your components
5. Add authentication headers if needed

## 📚 Additional Resources

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query TypeScript Guide](https://redux-toolkit.js.org/rtk-query/usage-with-typescript)
- [React Native Integration Examples](https://redux-toolkit.js.org/rtk-query/usage/examples)

The setup is complete and ready to use! 🎉