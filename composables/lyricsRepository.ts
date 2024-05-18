import type { Lyric } from "./types";
import { useApi } from "./useApi";

export const useLyric = () => {
  const api = useApi();

  function fetchAll(){
    return api.get<Lyric[]>("/lyrics");
  }

  function fetch(id: number | string){
    return api.get<Lyric>(`/lyrics/${id}`);
  }

  function search(params?: { search?: string, offset?: number, size?: number }){
    return api.get<Lyric>("/lyrics", { params });
  }

  function dispatch(lyric: Lyric){
    return api.post<Lyric>("/lyrics", lyric);
  }

  function update(id: number | string, Lyric: Lyric){
    return api.put(`/lyrics/${id}`, Lyric);
  }

  return { dispatch, fetch, fetchAll, search, update, };
};