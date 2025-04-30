import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../styles/editProduct.css';
import '../styles/view_requests.css';

const ViewRequests = () => {
    const product_id = window.location.pathname.split('/').pop();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("ProductId:",product_id);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // const response = await axios.get('/api/requests'); // Replace with your API endpoint
                // setRequests(response.data);
                axios.post(`${process.env.REACT_APP_API_URL}/viewRequests`, {product_id:product_id, userId: localStorage.getItem('UserId') })
                .then(res => {
                    setRequests(res.data.requests);
                    console.log(res.data.requests);
                    if(res.data.requests.length === 0){
                        setError("No requests found");
                    }
                })
                .catch(err => alert(err.response?.data?.error || 'Fetching requests failed'));
            } catch (err) {
                setError('Failed to fetch requests');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    function handleAccept(e,buyer_id,product_id) {
        console.log("product_id",product_id,buyer_id);
        var txt = window.confirm("Do you want to accept this request?");
        console.log(localStorage.getItem('UserId'));
        if(txt === true){
            // Accepting the request;
            axios.post(`${process.env.REACT_APP_API_URL}/acceptRequest`, { buyer_id:buyer_id, productId:product_id, user_id:localStorage.getItem('UserId') })
            .then(res => {
                console.log(res.data);
                alert("Request accepted successfully");
                window.location.reload();
                window.location = `/sellings`;
            })
            .catch(err => alert(err.response?.data?.error || 'Accepting request failed'));
            // window.location.reload();
        }
    }
    function handleReject(e,buyer_id,product_id, productname) {
        console.log(product_id, productname);
        var txt = window.confirm("Do you want to reject this request?");
        console.log(localStorage.getItem('UserId'));
        if(txt === true){
            // Rejecting the request;
            axios.post(`${process.env.REACT_APP_API_URL}/rejectRequest`, { buyer_id:buyer_id, productId:product_id,productname:productname, user_id:localStorage.getItem('UserId') })
            .then(res => {
                console.log(res.data);
                alert("Request rejected successfully");
                window.location.reload();
                window.location = `/view_requests/${product_id}`;
            })
            .catch(err => alert(err.response?.data?.error || 'Rejecting request failed'));
            window.location.reload();
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Requests for Your Products</h1>
            {requests.length === 0 ? (
                <p>No requests found.</p>
            ) : (
                <div className="view-product-container1">
                    {requests.map((request, index) => (
                        <div className="product-card1" key={index}>
                            {/* <img src={request.image} alt={product.product_name} className="product-image1" /> */}
                            <h1 className="product-name1">{request.product_name}</h1>
                            <p className="product-description1">{request.description}</p>
                            <p className="product-price1">${request.price}</p>
                            <div className="buyer-info">
                                <h2>Requested By:</h2>
                                <p><strong>Name:</strong> {request.buyer_name}</p>
                                <p><strong>Email address:</strong> {request.buyer_email}</p>
                                <p><strong>Contact Info:</strong> {request.contact_info}</p>
                                <p><strong>Address:</strong> {request.address}</p>
                                <button className="buy-button1" onClick={() => window.location = `/view_product/${request.product_id}`}>View Product</button>
                                <button className='buy-button1 accept' onClick={(e) => handleAccept(e,request.buyer_id,request.product_id)}>Accept</button>
                                <button className='buy-button1 reject' onClick={(e) => handleReject(e,request.buyer_id,request.product_id,request.product_name)}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewRequests;