"use client"
import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import useSWR from 'swr'
import { use } from "react";

const fetcher = (...args) => fetch(...args).then(res => res.json())
function useUsers () {
  const { data, error } = useSWR('http://localhost:3000/api/users', fetcher)
  return {
    users: data,
    isLoading: !error && !data,
    isError: error
  }
}

const getAllUser = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const data = await res.json()
  return data
}


export default function Home() {
  // console.log(useUsers())
  // const users = use(getAllUser());
  const { data, error } = useSWR('http://localhost:3000/api/users', fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js 13!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>app/page.tsx</code>
        </p>

        <div className={styles.grid}>
          {data.map((item) => (
            <Link
              key={item.name}
              href={{
                pathname: "/user/[id]",
                query: { id: item.id },
              }}
              className={styles.card}
            >
              <h3>{item.name} &rarr;</h3>
              <p>{item.email}</p>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
