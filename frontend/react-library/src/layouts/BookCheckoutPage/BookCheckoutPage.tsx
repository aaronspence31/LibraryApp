import BookModel from "../../models/BookModel";
import {useEffect, useState} from "react";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckoutAndReviewBox} from "./CheckoutAndReviewBox";

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>();
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    // grab the bookId path parameter out of the URL
    const bookId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        // retrieve books from backend to populate carousel
        const fetchBook = async () => {
            const url: string = `http://localhost:8080/api/books/${bookId}`;

            // make request to spring boot backend
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            // get response as JSON
            const responseJson = await response.json();

            const loadedBook: BookModel = {
                id: responseJson.id,
                title: responseJson.title,
                author: responseJson.author,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img,
            };

            setBook(loadedBook);
            setIsLoading(false);
        }
        fetchBook().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div>
            <div className='container d-none d-lg-block'>
                <div className='row mt-5'>
                    <div className='col-sm-2 col-md-2'>
                        {book?.img ?
                            <img src={book.img} alt='book' width='226' height='349'/>
                            :
                            <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} alt='book'
                                 width='226' height='349'/>
                        }
                    </div>
                    <div className='col-4 col-md-4 container'>
                        <div className='ml-2'>
                            <h2>{book?.title}</h2>
                            <h5 className='test-primary'>{book?.author}</h5>
                            <p className='lead'>{book?.description}</p>
                            <StarsReview rating={4.5} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox book={book} mobile={false} />
                </div>
                <hr/>
            </div>
            <div className='container d-lg-none mt-5'>
                <div className='d-flex justify-content-center align-items-center'>
                    {book?.img ?
                        <img src={book.img} alt='book' width='226' height='349'/>
                        :
                        <img src={require('../../Images/BooksImages/book-luv2code-1000.png')} alt='book'
                             width='226' height='349'/>
                    }
                </div>
                <div className='mt-4'>
                    <div className='ml-2'>
                        <h2>
                            {book?.title}
                        </h2>
                        <h5 className='text-primary'>
                            {book?.author}
                        </h5>
                        <p className='lead'>
                            {book?.description}
                        </p>
                        <StarsReview rating={4.5} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox book={book} mobile={true} />
                <hr/>
            </div>
        </div>
    )
}