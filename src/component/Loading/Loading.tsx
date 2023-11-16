"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Loading.scss";

function Loading() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 1500);
    if (loading === true) {
      route.push("/fr?Section=Accueil#Accueil");
    }
  }, [loading]);
  return <div className="loader"></div>;
}
export default Loading;
