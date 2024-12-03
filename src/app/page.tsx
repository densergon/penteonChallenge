"use client"; // Componente cliente

import Card from "../components/Card";
import { fetchCatFacts } from "@/api/catFacts";
import { fetchUsers } from "@/api/randomUser";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  // Configuración del scroll infinito
  const { ref, inView } = useInView({
    threshold: 0.1, // Cuando el elemento está ligeramente visible
    triggerOnce: false,
  });

  // Query para obtener usuarios
  const {
    data: usersData,
    fetchNextPage: fetchNextUsers,
    hasNextPage: hasNextUsers,
    isFetchingNextPage: isFetchingUsers,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useInfiniteQuery({
    queryKey: ["randomUsers"],
    queryFn: () => fetchUsers(),
    initialPageParam:1,
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });

  // Query para obtener cat facts
  const {
    data: catFactsData,
    fetchNextPage: fetchNextFacts,
    hasNextPage: hasNextFacts,
    isFetchingNextPage: isFetchingFacts,
    isLoading: isLoadingFacts,
    error: factsError,
  } = useInfiniteQuery({
    queryKey: ["catFacts"],
    queryFn: () => fetchCatFacts(10),
    initialPageParam:1,
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });

  // Lógica para cargar más datos al detectar scroll
  useEffect(() => {
    if (inView && hasNextUsers && hasNextFacts) {
      fetchNextUsers();
      fetchNextFacts();
    }
  }, [inView, hasNextUsers, hasNextFacts]);

  // Mostrar mensaje de carga o error
  if (isLoadingUsers || isLoadingFacts) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (usersError || factsError) {
    return <p className="text-center mt-20 text-red-500">Error fetching data.</p>;
  }

  // Combinar los datos cargados
  const users = usersData?.pages.flatMap((page) => page.results) || [];
  const catFacts = catFactsData?.pages.flatMap((page) => page.data) || [];

  return (
    <main className="min-h-screen bg-gray-100 p-5 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">
        Challenge Penteon
      </h1>
      <div className="grid grid-cols-1 gap-1 w-8/12">
        {users.map((user, index) => (
          <div key={index} className="flex justify-center">
            <Card
            key={user.login.uuid}
            name={`${user.name.first} ${user.name.last}`}
            picture={user.picture.large}
            fact={catFacts[index]?.fact || "No fact available"}
          />
            </div>
        ))}
      </div>
      <div ref={ref} className="mt-4 flex justify-center w-full h-8">
        {(isFetchingUsers || isFetchingFacts) && <p>Loading more...</p>}
      </div>
    </main>
  );
}
