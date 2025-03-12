"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import AduioList from "@/components/AudioList";
import Loader from "@/components/Loader";
import { useSpeech } from "@/contexts/SpeechContext";

const SpeechesPage = () => {
  const { setSpeeches } = useSpeech();
  const [loading, setLoading] = useState(true);
  const fetchSpeeches = async () => {
    const response = await api.get("/user/speeches?start=0&limit=10");
    setSpeeches(response.data.data);
  };
  useEffect(() => {
    setLoading(true);
    fetchSpeeches();
    setLoading(false);
  }, []);
  return (
    <div className="w-full justify-center flex flex-row">
      <div className="md:w-4/5 w-full p-4">
        {loading ? <Loader /> : <AduioList />}
      </div>
    </div>
  );
};

export default SpeechesPage;
