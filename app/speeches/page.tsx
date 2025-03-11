"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
import AduioList from "@/components/AudioList";
import Loader from "@/components/Loader";
export interface Speech {
  id: string;
  post_id: string;
  user_id: string;
  speech_type: string;
  voice_type: string;
  audio_url: string;
  cost: number;
  status: number;
  created_at: string;
}

const SpeechesPage = () => {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
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
        {loading ? <Loader /> : <AduioList speeches={speeches} />}
      </div>
    </div>
  );
};

export default SpeechesPage;
