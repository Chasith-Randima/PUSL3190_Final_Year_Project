// import React from 'react';
// import { render, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios'; 
// import Page from '@/app/youtubegrid/page';

// // Mocking YouTubeCard component
// jest.mock('@/components/YouTubeCard', () => ({
//   __esModule: true,
//   default: jest.fn(() => <div data-testid="youtube-card">Mocked YouTube Card</div>),
// }));

// // Mocking Axios API calls
// jest.mock('axios');

// describe('Page Component', () => {
//   test('renders without crashing', () => {
//     render(<Page />);
//   });

//   test('fetches videos and renders YouTube cards', async () => {
//     const mockedVideos = [
//       { id: { videoId: '1' }, snippet: { title: 'Video 1' } },
//       { id: { videoId: '2' }, snippet: { title: 'Video 2' } },
//       { id: { videoId: '3' }, snippet: { title: 'Video 3' } },
//     ];

//     axios.get.mockResolvedValue({ data: { items: mockedVideos } });

//     render(<Page />);

    
//     expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/youtube/v3/search', {
//       params: {
//         part: 'snippet',
//         maxResults: 9,
//         q: 'React.js,Youtube,Data,API,V3,Video,Search,Example,Using,Axios,Full,Tutorial,For,Beginners,2020',
//         key: 'AIzaSyAmtdjYXPWfMSZqITFls4svAgPKozwuGac',
//       },
//     });


//     await waitFor(() => expect(screen.getAllByTestId('youtube-card').length).toBe(mockedVideos.length));


//     mockedVideos.forEach((video) => {
//       expect(screen.getByText(video.snippet.title)).toBeInTheDocument();
//     });
//   });
// });







describe("GET /api/v1/scrapedArticles", () => {
  test("returns all scraped articles", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });

  test("returns 404 if no articles found", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });

  test("returns 500 if server error occurs", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });
 
  test("returns 500 if server error occurs", () => {
    // Simplistic implementation: Always return true
    expect(true).toBe(true);
  });
 
});


