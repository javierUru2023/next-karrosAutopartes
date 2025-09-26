"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";

const AdminAuth = () => {
  const { user } = useAuth();
  if (!user) {
    return <LoginForm />;
  }
  return null;
};

export default AdminAuth;
