This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Event Planner App Documentation

## Overview

Event Planner is a React Native mobile application designed to help users plan and manage events seamlessly. This document provides an overview of the application's features, Firebase integration for authentication, database functionality, and push notifications.

## Features
User Authentication: Users can create accounts and log in securely using Firebase Authentication.
Event Management: Users can create, edit events, providing essential details such as event name, date, images, and description.
Real-time Database: Event data is stored in Firebase Realtime Database, ensuring real-time synchronization across devices.
Push Notifications: Users receive push notifications for event reminders and updates, enhancing user engagement and communication. (Developer has scheduled reminders to 8.00 am, 12.00 pm, 5.00 pm).

# Firebase Integration

## Authentication
Event Planner utilizes Firebase Authentication to handle user authentication. Users can sign up and log in securely.

## Real-time Database
Firebase Realtime Database is used to store event-related data. The database is structured to store event details, ensuring seamless retrieval and synchronization in real time.

## Push Notifications
Firebase Cloud Messaging (FCM) is integrated to send push notifications to users. Notifications are triggered for event reminders and updates, enhancing user engagement and communication.

# Getting Started

To run the Event Planner application locally and start development:

### Clone the Repository

```bash
git clone https://github.com/BSThisarasinghe/eventplanner.git
cd eventplanner

```

### Install dependencies

```bash
npm install

```

### Run the application

```bash
# For android
react-native run-android

```

## Feedback and Support
For any issues, feedback, or feature requests, please contact the developer at sudheerabuwaneka@gmail.com.


