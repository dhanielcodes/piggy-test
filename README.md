# 📱 Mobile Restaurant Listing App

This is a mobile app built using **React Native** to display a list of restaurants with features like browsing, filtering, favoriting, offline access, and CRUD operations for restaurant reviews. The app provides a seamless experience for users to explore and interact with restaurant listings.

---

## ✨ **Features**

- **Home Page**

  - View a list of all restaurants.
  - See a "Last Seen" section that shows recently viewed restaurants.

- **Search & Filter**

  - Search for restaurants by name.
  - Filter restaurants based on their rating.

- **Favorites**

  - Favorite/unfavorite restaurants and view them on a dedicated page.

- **Offline Browsing**

  - Access previously loaded restaurant data offline using caching.

- **Restaurant Details**
  - View detailed information about a specific restaurant.
  - Read customer reviews for each restaurant.
  - Add, edit, and delete reviews for a restaurant.

---

## 🛠️ **Tech Stack**

- **React Native**: For building cross-platform mobile applications.
- **Stylesheets**: For custom styling of the app components.
- **Context API**: For state management across the app.
- **AsyncStorage**: For persistent storage and caching of restaurant list data to enable offline browsing.
- **react-native-fast-image**: For efficient image caching to enhance performance.

## 🚀 **How It Works**

1. **Home Page**:

   - Displays a list of all restaurants.
   - Recently viewed restaurants are listed in a "Last Seen" section.
   - Data is cached using **AsyncStorage** to enable offline browsing.

2. **Favorites**:

   - Users can favorite a restaurant from the Home, Details, or any other page displaying the restaurant.
   - The favorite status is stored in **AsyncStorage** and synced across relevant lists.

3. **Restaurant Details & Reviews**:

   - Users can view restaurant information and customer reviews.
   - CRUD (Create, Read, Update, Delete) operations are enabled for reviews.
   - Updates are reflected in all pages where the restaurant appears.

4. **Search & Filter**:
   - Users can search for restaurants by name.
   - Filtering by restaurant rating is also possible.

---

## 💡 **Thought Process**

1. **Modular Design**:

   - Components were broken down into reusable UI components like **RestaurantCard**, **ReviewModal**, **SkeletonCard**, and **FormInput**.
   - Pages such as Home, Search, Favorites, and Restaurant Details were each given a dedicated screen file for better organization.

2. **Data Persistence**:

   - **AsyncStorage** was used to cache the restaurant list and favorites, ensuring data persists between sessions and supports offline access.

3. **State Management**:

   - The **Context API** was used to manage global state (like favorite status) across different screens without the need for prop drilling.

4. **Image Optimization**:
   - Images were loaded with **react-native-fast-image**, which provides better performance and caching compared to the default **Image** component.

---

## ⚠️ **Challenges Faced**

### **1. Managing the Favorite Feature**

**Problem**:  
The "favorite" status for a restaurant had to be updated in multiple places (Home, Favorites, Last Seen, and Details pages). Updating the restaurant's favorite status in one place required that it be reflected in all instances of the same restaurant object.

**Solution**:

- When a restaurant's favorite status changes, the app identifies all instances of that restaurant object across all pages.
- Using **map()**, the app locates the restaurant in each array (Favorites, Last Seen, etc.) and updates its status.
- This solution was later adapted for CRUD operations on the restaurant reviews, making it easy to update reviews in multiple places.

---

## 📦 **Installation**

1. **Clone this repository:**
   ```bash
   git clone https://github.com/dhanielcodes/piggy-test.git
   cd piggy-test
   ```

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
