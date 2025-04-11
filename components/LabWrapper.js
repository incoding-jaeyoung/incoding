"use client"
import React from "react"
import PageTransition from "./PageTransition"

export default function LabWrapper({ children }) {
  return <PageTransition disableScroll={false}>{children}</PageTransition>
}