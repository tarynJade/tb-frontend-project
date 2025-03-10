<template>
    <AdminNavigationComponent />
    <h2>Welcome to the Admin Page</h2>
    <p>This is the admin page. You can add, edit, and delete cats here.</p>
  </template>
  
  <script setup>
  import AdminNavigationComponent from "@/components/AdminNavigationComponent.vue";
  </script>
  
  <style>
  h2 {
    margin-top: 100px;
    text-align: center;
  }
  p {
    text-align: center;
  }
  </style>