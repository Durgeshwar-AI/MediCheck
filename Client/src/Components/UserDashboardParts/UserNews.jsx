import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, RefreshCw } from 'lucide-react';

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
    const pageSize = 15;

    useEffect(() => {
        // Fetch news data from API on component mount
        fetchNewsFromAPI(1);
    }, []);

    const fetchNewsFromAPI = async (pageNum) => {
        try {
            pageNum === 1 ? setLoading(true) : setLoadingMore(true);
    
            // Ensure API key is fetched correctly - more robust approach
            const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
    
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
                const validArticles = data.articles.filter(article => article.urlToImage && article.description);
                
                if (pageNum === 1) {
                    setArticles(validArticles);
                } else {
                    setArticles(prev => [...prev, ...validArticles]);
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
        fetchNewsFromAPI(page + 1);
    };

    const nextCard = () => {
        if (currentIndex < articles.length - 1) {
            setDirection('right');
            setCurrentIndex(currentIndex + 1);
        }
    };

    const prevCard = () => {
        if (currentIndex > 0) {
            setDirection('left');
            setCurrentIndex(currentIndex - 1);
        }
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
                if (diff > 0) {
                    setDirection('right');
                    nextCard(); // Swipe left = next card
                } else {
                    setDirection('left');
                    prevCard(); // Swipe right = previous card
                }
            }
        }

        setCurrentX(0);
        setStartX(0);
    };

    const formatDate = (dateString) => {
        try {
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
        fetchNewsFromAPI(1);
    };

    const getInitialCardStyle = (direction) => {
        return direction === 'right' ? { 
            x: 300, 
            opacity: 0, 
            scale: 0.9 
        } : { 
            x: -300, 
            opacity: 0, 
            scale: 0.9 
        };
    };

    const getExitCardStyle = (direction) => {
        return direction === 'right' ? { 
            x: -300, 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.4 }
        } : { 
            x: 300, 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: 0.4 }
        };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center">
                    <div className="animate-spin">
                        <RefreshCw size={36} className="text-indigo-600" />
                    </div>
                    <div className="mt-4 text-lg font-medium text-gray-600">Loading latest news...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-50 text-red-700 rounded-lg shadow">
                <p className="font-medium mb-2">{error}</p>
                <button 
                    onClick={handleRetry}
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center transition-all"
                >
                    <RefreshCw size={16} className="mr-2" /> Retry
                </button>
            </div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="p-6 bg-gray-50 text-gray-700 rounded-lg shadow">
                <p className="font-medium mb-2">No news articles available at the moment.</p>
                <button 
                    onClick={handleRetry}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center transition-all"
                >
                    <RefreshCw size={16} className="mr-2" /> Refresh
                </button>
            </div>
        );
    }

    const shouldShowLoadMore = currentIndex === articles.length - 1 && currentIndex >= pageSize - 1;

    return (
        <div className="w-full mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl shadow-2xl">
            <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8">
                Latest Health News
            </h2>
            
            <div className="relative">
                {/* Navigation Buttons */}
                <button
                    onClick={prevCard}
                    disabled={currentIndex === 0}
                    className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg disabled:opacity-40 hover:bg-indigo-700 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <button
                    onClick={nextCard}
                    disabled={currentIndex === articles.length - 1 && !shouldShowLoadMore}
                    className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-8 bg-indigo-600 text-white p-3 rounded-full shadow-lg disabled:opacity-40 hover:bg-indigo-700 transition-all"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Card Container */}
                <div
                    className="overflow-hidden rounded-xl bg-white shadow-lg border border-gray-200"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        key={currentIndex}
                        className="relative bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl transition-all duration-400"
                        style={{
                            transform: isSwiping ? `translateX(${currentX - startX}px)` : 'translateX(0)',
                        }}
                    >
                        {shouldShowLoadMore ? (
                            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <div>
                                    <img 
                                        src="/api/placeholder/400/250" 
                                        alt="View more news"
                                        className="w-48 h-48 mb-8 rounded-full object-cover mx-auto opacity-70"
                                    />
                                    <h3 className="text-2xl font-bold text-indigo-800 mb-4">
                                        Ready for more news?
                                    </h3>
                                    <p className="text-gray-600 mb-8">
                                        You&apos;ve seen all available articles. Load more to continue exploring health updates.
                                    </p>
                                    <button
                                        onClick={loadMoreArticles}
                                        disabled={loadingMore}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition-all flex items-center justify-center mx-auto"
                                    >
                                        {loadingMore ? (
                                            <>
                                                <div className="animate-spin mr-2">
                                                    <RefreshCw size={18} />
                                                </div>
                                                Loading...
                                            </>
                                        ) : (
                                            <>View More News</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <img
                                        src={articles[currentIndex]?.urlToImage || "/api/placeholder/600/300"}
                                        alt={articles[currentIndex]?.title}
                                        className="w-full h-60 object-cover rounded-t-xl"
                                        onError={(e) => {
                                            e.target.src = "/api/placeholder/600/300";
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                        {currentIndex + 1} / {articles.length}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
                                            {articles[currentIndex]?.source?.name || 'Unknown Source'}
                                        </span>
                                        <span className="text-gray-500 text-sm italic">
                                            {formatDate(articles[currentIndex]?.publishedAt)}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                        {articles[currentIndex]?.title}
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {articles[currentIndex]?.description || 'No description available.'}
                                    </p>
                                    <a
                                        href={articles[currentIndex]?.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                                    >
                                        Read full article <ExternalLink size={16} className="ml-2" />
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Pagination Indicators */}
                <div className="flex justify-center mt-6 overflow-x-auto pb-2 px-4">
                    <div className="flex space-x-2">
                        {articles.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 mx-1 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-indigo-600 w-6' 
                                        : (Math.abs(index - currentIndex) <= 5 
                                            ? 'bg-gray-300 hover:bg-indigo-400'
                                            : 'hidden md:block bg-gray-300 hover:bg-indigo-400'
                                        )
                                }`}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 'right' : 'left');
                                    setCurrentIndex(index);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserNews;