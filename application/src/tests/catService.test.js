import { describe, it, expect, vi } from 'vitest';
import { getCats, getCatById, postCat, updateCat, deleteCat, getHypoallegenicCats } from '../services/catService';

// Mock the fetch API - to ensure no real HTTP requests are made during testing
global.fetch = vi.fn();

describe('CatService Tests', () => {
  it('should fetch all cats', async () => {
    const mockCats = [
      { id: 1, breed: 'Siamese', description: 'Friendly', hypoallergenic: true },
      { id: 2, breed: 'Persian', description: 'Lazy', hypoallergenic: false },
    ];

    // Mock fetch to return the mockCats
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCats,
    });

    const cats = await getCats();
    expect(cats).toEqual(mockCats);
    expect(fetch).toHaveBeenCalledWith('/api/get_cats', expect.any(Object));
  });

  it('should fetch a single cat by ID', async () => {
    const mockCat = [{ id: 1, breed: 'Siamese', description: 'Friendly', hypoallergenic: true }];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCat,
    });

    const cat = await getCatById(1);
    expect(cat).toEqual(mockCat);
    expect(fetch).toHaveBeenCalledWith('/api/get_cat/1', expect.any(Object));
  });

  it('should create a new cat', async () => {
    const newCat = {
      breed: 'Siamese',
      description: 'Friendly',
      temperament: 'Playful',
      hypoallergenic: true,
      image_url: 'image-url.com',
    };

    const mockResponse = { id: 3, ...newCat };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await postCat(
      newCat.breed,
      newCat.description,
      newCat.temperament,
      newCat.hypoallergenic,
      newCat.image_url
    );
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/new_cat', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify(newCat),
    }));
  });

  it('should update an existing cat', async () => {
    const updatedCat = {
      id: 1,
      breed: 'Siamese',
      description: 'Friendly',
      temperament: 'Playful',
      hypoallergenic: true,
      image_url: 'image-url.com',
    };

    const mockResponse = { success: true, message: 'Cat updated successfully', data: updatedCat };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await updateCat(updatedCat);
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/edit_cat/1', expect.objectContaining({
      method: 'PUT',
      body: JSON.stringify(updatedCat),
    }));
  });

  it('should delete a cat', async () => {
    const mockResponse = { success: true, message: 'Cat deleted successfully' };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const response = await deleteCat(1);
    expect(response).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/delete_cat/1', expect.objectContaining({
      method: 'DELETE',
    }));
  });

  it('should fetch all hypallergenic cats', async () => {       
    const mockCats = [
        { id: 1, breed: 'Siamese', description: 'Friendly', hypoallergenic: true },
        { id: 2, breed: 'Persian', description: 'Lazy', hypoallergenic: false },
        { id: 3, breed: 'Sphynx', description: 'Friendly', hypoallergenic: true },
        { id: 4, breed: 'Bengal', description: 'Playful', hypoallergenic: false },
    ];
    
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockCats,
    });
    
    const cats = await getCats();
    const hypallergenicCats = await getHypoallegenicCats(cats);
    expect(hypallergenicCats).toEqual([
        { id: 1, breed: 'Siamese', description: 'Friendly', hypoallergenic: true },
        { id: 3, breed: 'Sphynx', description: 'Friendly', hypoallergenic: true },
    ]);
    expect(fetch).toHaveBeenCalledWith('/api/get_cats', expect.any(Object));
    });

   it('should throw an error if the response is not ok', async () => {
    
     fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not found' }),
        });

    await expect(getCats()).rejects.toThrow('Error: 404');
    });
});
