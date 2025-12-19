"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Loading.scss";

function Loading() {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading === true) {
      route.push("/fr");
    }
  }, [loading, route]);
  return <div className="loader"></div>;
}
export default Loading;
