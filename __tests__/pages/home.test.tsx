import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import Home from '@/app/page'
import { renderWithQueryClient } from '@/helpers/test-utils/renderWithQueryClient';

jest.mock('@/hooks/useIsClient', () => ({
    __esModule: true,
    default: () => true, 
}));
  
 
describe('Home Page', () => {
    it('renders the Authentications component', () => {
        renderWithQueryClient(<Home />);
  
      expect(
        screen.getByRole('heading', { name: /nexus chat/i })
      ).toBeInTheDocument();
  
      expect(
        screen.getByText(/join 2,000\+ users/i)
      ).toBeInTheDocument();
  
      expect(
        screen.getByText(/next-generation messaging platform/i)
      ).toBeInTheDocument();
    });
});