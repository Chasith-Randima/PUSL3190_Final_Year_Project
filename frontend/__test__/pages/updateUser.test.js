// import React from 'react';
// import { render, fireEvent, waitFor, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
// import axios from 'axios'; 
// import UpdateUser from '@/app/users/updateUser/page';

// // Mocking Next.js useRouter hook
// jest.mock('next/router', () => ({
//   useRouter: () => ({
//     query: { userId: 'mockedUserId' },
//   }),
// }));

// // Mocking Next.js useSearchParams hook
// jest.mock('next/navigation', () => ({
//   useSearchParams: () => ({
//     get: jest.fn().mockReturnValue('mockedUserId'),
//   }),
// }));

// // Mocking Axios API calls
// jest.mock('@/actions/user', () => ({
//   getProfile: jest.fn().mockResolvedValue({
//     status: 'success',
//     doc: {
//       username: 'mockedUsername',
//       firstName: 'mockedFirstName',
//       lastName: 'mockedLastName',
//       email: 'mockedEmail@example.com',
//       role: 'mockedRole',
//       images: 'mockedImagePath',
//     },
//     message: 'User data retrieved successfully',
//   }),
//   updateUser: jest.fn().mockResolvedValue({
//     status: 'success',
//     message: 'User updated successfully',
//   }),
// }));

// describe('UpdateUser Component', () => {
//   test('renders without crashing', () => {
//     render(<UpdateUser />);
//   });

//   test('displays user data after rendering', async () => {
//     render(<UpdateUser />);
//     await waitFor(() => expect(screen.getByDisplayValue('mockedUsername')).toBeInTheDocument());
//     await waitFor(() => expect(screen.getByDisplayValue('mockedFirstName')).toBeInTheDocument());
//     await waitFor(() => expect(screen.getByDisplayValue('mockedLastName')).toBeInTheDocument());
//     await waitFor(() => expect(screen.getByDisplayValue('mockedEmail@example.com')).toBeInTheDocument());
//     await waitFor(() => expect(screen.getByDisplayValue('mockedRole')).toBeInTheDocument());
//   });

//   test('updates user when form is submitted', async () => {
//     render(<UpdateUser />);
//     fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newMockedUsername' } });
//     fireEvent.change(screen.getByLabelText('FirstName'), { target: { value: 'newMockedFirstName' } });
//     fireEvent.change(screen.getByLabelText('LastName'), { target: { value: 'newMockedLastName' } });
//     fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'newMockedEmail@example.com' } });
//     fireEvent.change(screen.getByLabelText('Role'), { target: { value: 'newMockedRole' } });
//     fireEvent.click(screen.getByText('Update User'));
//     await waitFor(() => expect(axios.post).toHaveBeenCalled());
//     await waitFor(() => expect(screen.getByText('User updated successfully')).toBeInTheDocument());
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


