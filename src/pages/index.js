import { useContext, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import styles from '../styles/Home.module.css';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

export default function Forum() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const imageRef = useRef(null);

  useEffect(() => {
    if (!(isAuthenticated === undefined)) {
      router.push('/dashboard');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    function handleResize() {
      if (imageRef.current) {
        const containerHeight = imageRef.current.parentNode.offsetHeight;
        const containerWidth = imageRef.current.parentNode.offsetWidth;
        const imageHeight = imageRef.current.offsetHeight;
        const imageWidth = imageRef.current.offsetWidth;
        
        const scaleRatio = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
        const scaledWidth = imageWidth * scaleRatio;
        const scaledHeight = imageHeight * scaleRatio;
        
        imageRef.current.style.width = `${scaledWidth}px`;
        imageRef.current.style.height = `${scaledHeight}px`;
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    router.prefetch('/login'); // Prefetch the /login page

    // Redirect to /login
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 1000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return null; // Return null to hide the current page content
}
