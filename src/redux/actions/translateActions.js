//Thunk Aksiyonu

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    //Api'dan dil verilerini al
    const res = await axios.request(options);

    //Aksiyonun payload'i olacak veriyi return etme

    return res.data.data.languages;
  }
);

//ceviri islemini yapip sonucunu store'a aktaran aksiyon

export const translateText = createAsyncThunk(
  "translate/text",
  async ({ text, sourceLang, targetLang }) => {
    //istek icin gerekli ayarlar
    const params = new URLSearchParams();
    params.set("source_language", sourceLang.value);
    params.set("target_language", targetLang.value);
    params.set("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "937115946amsh313633b3451c2aep10b6c1jsnbbaf8d60e3c7",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: params,
    };

    //yukaridaki ayarlara gore api istegi atar
    const res = await axios.request(options);
    //aksiyonun payload'ini belirleme
    return res.data.data.translatedText;
  }
);
