import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation, } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Pagination from "../Pagination/Pagination";

import { fetchNotes, deleteNote } from "../../services/noteService";
import css from "./App.module.css";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleSearchChange = (value: string) => {
    debouncedSearch(value);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: 12, search }),
    placeholderData: (prev) => prev,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={handleOpenModal}>
          Create note +
        </button>
      </header>

      {!isLoading && !isError && data && (
        <NoteList
          notes={data.notes}
          onDelete={(id) => deleteMutation.mutate(id)}
        />
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onSuccess={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
};

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
