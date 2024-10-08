import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtById, updateArtById } from '../services/api'; // Assuming this API exists

const UpdateArt = () => {
    const { artId } = useParams(); // Get the art ID from the route
    const navigate = useNavigate();
    const [art, setArt] = useState({
        artTitle: '',
        description: '',
        category: '',
        price: '',
        pictureFile1: null,
        pictureFile2: null,
        pictureFile3: null,
        pictureFile4: null,
    });

    useEffect(() => {
        const fetchArt = async () => {
            try {
                const artData = await getArtById(artId);
                setArt(artData); // Populate form with current art data
            } catch (error) {
                console.error('Error fetching art:', error);
            }
        };

        fetchArt();
    }, [artId]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        
        if (files) {
            // Handle file input
            setArt((prevArt) => ({
                ...prevArt,
                [name]: files[0], // Store the first selected file
            }));
        } else {
            // Handle text input
            setArt((prevArt) => ({
                ...prevArt,
                [name]: value,
            }));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Create a FormData object to send files and other data
        const formData = new FormData();
        formData.append('artTitle', art.artTitle);
        formData.append('description', art.description);
        formData.append('category', art.category);
        formData.append('price', art.price);

        // Append each image file if available
        if (art.pictureFile1) formData.append('picture1', art.pictureFile1);
        if (art.pictureFile2) formData.append('picture2', art.pictureFile2);
        if (art.pictureFile3) formData.append('picture3', art.pictureFile3);
        if (art.pictureFile4) formData.append('picture4', art.pictureFile4);

        try {
            await updateArtById(artId, formData); // Assuming the update API accepts FormData
            navigate(`/arts/${artId}`); // Redirect to the updated art details page
        } catch (error) {
            console.error('Error updating art:', error);
        }
    };

    return (
        <form onSubmit={handleUpdate} encType="multipart/form-data">
            <h2>Update Art</h2>
            <input
                type="text"
                name="artTitle"
                value={art.artTitle}
                onChange={handleInputChange}
                placeholder="Title"
            />
            <textarea
                name="description"
                value={art.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
            <input
                type="text"
                name="category"
                value={art.category}
                onChange={handleInputChange}
                placeholder="Category"
            />
            <input
                type="number"
                name="price"
                value={art.price}
                onChange={handleInputChange}
                placeholder="Price"
            />
            
            {/* File input fields for image uploads */}
            <input
                type="file"
                name="pictureFile1"
                onChange={handleInputChange}
                accept="image/*"
                placeholder="Image 1"
            />
            <input
                type="file"
                name="pictureFile2"
                onChange={handleInputChange}
                accept="image/*"
                placeholder="Image 2"
            />
            <input
                type="file"
                name="pictureFile3"
                onChange={handleInputChange}
                accept="image/*"
                placeholder="Image 3"
            />
            <input
                type="file"
                name="pictureFile4"
                onChange={handleInputChange}
                accept="image/*"
                placeholder="Image 4"
            />

            <button type="submit">Update Art</button>
        </form>
    );
};

export default UpdateArt;
