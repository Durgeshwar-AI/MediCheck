import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserNews = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const [page, setPage] = useState(1);
    const [direction, setDirection] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const pageSize = 12;

    // Example API key for demonstration - replace with your actual implementation
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

    useEffect(() => {
        // Fetch news data from API on component mount
        fetchNewsFromAPI(1);
    }, );

    const fetchNewsFromAPI = async (pageNum) => {
        try {
            pageNum === 1 ? setLoading(true) : setLoadingMore(true);

            // In a real application, ensure API key is fetched correctly
            // Either use environment variables or a more secure method
            if (!API_KEY) {
                throw new Error('News API key is missing. Please check your environment variables.');
            }

            // Fetch news data
            const response = await fetch(`https://newsapi.org/v2/top-headlines?category=health&apiKey=${API_KEY}&pageSize=${pageSize}&page=${pageNum}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            // Check response data integrity
            if (data.status === 'ok' && data.articles) {
                // Filter out invalid articles (those without images or descriptions)
                const validArticles = data.articles.filter(article =>
                    article && (article.urlToImage || article.description)
                );

                if (pageNum === 1) {
                    setArticles(validArticles);
                } else {
                    // Ensure we don't add duplicates when appending
                    const existingUrls = new Set(articles.map(a => a.url));
                    const newArticles = validArticles.filter(article => !existingUrls.has(article.url));
                    setArticles(prev => [...prev, ...newArticles]);
                }

                setPage(pageNum);
            } else {
                throw new Error(data.message || 'Failed to fetch news');
            }
        } catch (err) {
            setError('Error fetching news: ' + err.message);
            console.error('News API error:', err);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const loadMoreArticles = () => {
        if (!loadingMore) {
            fetchNewsFromAPI(page + 1);
        }
    };

    const nextCard = () => {
        if (currentIndex < articles.length - 1 && !isTransitioning) {
            setDirection('right');
            setIsTransitioning(true);
            setCurrentIndex(currentIndex + 1);
            setTimeout(() => setIsTransitioning(false), 300);
        } else if (currentIndex === articles.length - 1 && !loadingMore) {
            loadMoreArticles();
        }
    };

    const prevCard = () => {
        if (currentIndex > 0 && !isTransitioning) {
            setDirection('left');
            setIsTransitioning(true);
            setCurrentIndex(currentIndex - 1);
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    const swipeVariants = {
        enter: (direction) => ({
            x: direction === 'right' ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction === 'right' ? -1000 : 1000,
            opacity: 0
        })
    };

    const swipeTransition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    };

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        setCurrentX(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!isSwiping) return;
        setIsSwiping(false);

        // Only proceed if we have valid start and current X values
        if (startX && currentX) {
            const diff = startX - currentX;
            const threshold = 75; // Minimum swipe distance

            if (Math.abs(diff) > threshold) {
                if (diff > 0 && currentIndex < articles.length - 1) {
                    nextCard(); // Swipe left = next card
                } else if (diff < 0 && currentIndex > 0) {
                    prevCard(); // Swipe right = previous card
                }
            }
        }

        setCurrentX(0);
        setStartX(0);
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'Date unavailable';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        } catch (err) {
            console.error('Error formatting date:', err);
            return 'Date unavailable';
        }
    };

    // Add a retry function for API failures
    const handleRetry = () => {
        setError(null);
        setCurrentIndex(0);
        fetchNewsFromAPI(1);
    };

    // Placeholder image URL - use a reliable source
    const getPlaceholderImage = () => {
        return "https://via.placeholder.com/600x300?text=No+Image+Available";
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 w-full">
                <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow">
                    <div className="animate-spin">
                        <RefreshCw size={40} className="text-blue-600" />
                    </div>
                    <div className="mt-4 text-lg font-medium text-gray-600">Loading latest health news...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-white border border-red-100 rounded-xl shadow-lg max-w-md mx-auto">
                <div className="bg-red-50 text-red-700 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">Unable to Load News</h3>
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={handleRetry}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center transition-all"
                    >
                        <RefreshCw size={16} className="mr-2" /> Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="p-8 bg-white rounded-xl shadow-lg max-w-md mx-auto">
                <div className="bg-gray-50 text-gray-700 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">No News Available</h3>
                    <p className="font-medium mb-4">We couldn&apos;t find any health news articles at the moment.</p>
                    <button
                        onClick={handleRetry}
                        className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center mx-auto transition-all"
                    >
                        <RefreshCw size={16} className="mr-2" /> Refresh
                    </button>
                </div>
            </div>
        );
    }

    const shouldShowLoadMore = currentIndex === articles.length - 1;
    const currentArticle = articles[currentIndex];

    return (
        <div className="w-full mx-auto p-4 md:p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-center text-blue-800 mb-6">
                Latest Health News
            </h2>
    
            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0 || isTransitioning}
                    className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 md:-translate-x-8 
                        bg-indigo-500 text-white p-1.5 md:p-2 rounded-full shadow-lg 
                        disabled:opacity-40 
                        hover:bg-indigo-600 transition-all 
                        ${currentIndex === 0 ? 'hidden opacity-0' : 'block opacity-90 hover:opacity-100'}`}
                    aria-label="Previous article"
                >
                    <ChevronLeft size={24} />
                </button>
    
                <button
                    onClick={nextCard}
                    disabled={currentIndex === articles.length - 1 || loadingMore || isTransitioning}
                    className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 md:translate-x-8 
                        bg-indigo-500 text-white p-1.5 md:p-2 rounded-full shadow-lg 
                        disabled:opacity-40 
                        hover:bg-indigo-600 transition-all 
                        ${currentIndex === articles.length - 1 ? 'hidden opacity-0' : 'block opacity-90 hover:opacity-100'}`}
                    aria-label="Next article"
                >
                    <ChevronRight size={24} />
                </button>
    
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={swipeVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={swipeTransition}
                    className="relative bg-transparent rounded-xl"
                >
                    {/* Card Container */}
                    <div
                        className="overflow-hidden rounded-xl "
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            key={`card-${currentIndex}`}
                            className={`relative bg-transparent rounded-xl transition-all duration-300 ease-in-out
                                ${isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}
                                ${isSwiping ? 'transition-none' : ''}`}
                            style={{
                                transform: isSwiping
                                    ? `translateX(${currentX - startX}px)`
                                    : 'translateX(0)',
                            }}
                        >
                            {shouldShowLoadMore && page * pageSize < 100 ? (
                                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                    <div>
                                        <div className="w-32 h-32 mb-8 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                                            <RefreshCw size={48} className="text-blue-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-blue-800 mb-4">
                                            Ready for more news?
                                        </h3>
                                        <p className="text-gray-600 mb-8">
                                            You&apos;ve seen all available articles. Load more to continue exploring health updates.
                                        </p>
                                        <button
                                            onClick={loadMoreArticles}
                                            disabled={loadingMore}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-all flex items-center justify-center mx-auto"
                                        >
                                            {loadingMore ? (
                                                <>
                                                    <RefreshCw size={18} className="mr-2 animate-spin" />
                                                    Loading more articles...
                                                </>
                                            ) : (
                                                <>Load More Articles</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Vertical card with background image and overlay
                                <div
                                    className="relative w-full h-140 bg-cover bg-center rounded-xl overflow-hidden"
                                    style={{
                                        backgroundImage: `url(${currentArticle?.urlToImage || getPlaceholderImage()})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="absolute top-2 right-2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow z-20">
                                        {currentIndex + 1} / {articles.length -1}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 h-3/7 bg-gray-700/60 p-4 md:p-6">
                                        <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                                {currentArticle?.source?.name || 'Unknown Source'}
                                            </span>
                                            <span className="text-gray-300 text-sm italic">
                                                {formatDate(currentArticle?.publishedAt)}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
                                            {currentArticle?.title || 'No title available'}
                                        </h3>
                                        <p className="text-gray-200 mb-4 line-clamp-2">
                                            {currentArticle?.description || 'No description available.'}
                                        </p>
                                        <Link
                                            to={currentArticle?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:font-bold transition-transform hover:scale-105"
                                        >
                                            Read full article <ExternalLink size={16} className="ml-2" />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
    
                {/* Pagination Indicators */}
                <div className="flex justify-center mt-4 overflow-x-auto pb-2 px-4">
                    <div className="flex space-x-1">
                        {articles.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all ${
                                    index === currentIndex
                                        ? 'bg-blue-600 w-6'
                                        : Math.abs(index - currentIndex) <= 5
                                        ? 'bg-gray-300 hover:bg-blue-400 w-2'
                                        : 'hidden md:block bg-gray-300 hover:bg-blue-400 w-2'
                                }`}
                                onClick={() => {
                                    if (!isTransitioning) {
                                        setIsTransitioning(true);
                                        setDirection(index > currentIndex ? 'right' : 'left');
                                        setTimeout(() => {
                                            setCurrentIndex(index);
                                            setIsTransitioning(false);
                                        }, 300);
                                    }
                                }}
                                aria-label={`Go to article ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNews;