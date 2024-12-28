import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PublicLeadForm from '../pages/public-lead-form';

describe('PublicLeadForm', () => {
  beforeEach(() => {
    render(<PublicLeadForm />);
  });

  test('renders form elements', () => {
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: '' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('LinkedIn / Personal Website URL')).toBeInTheDocument();
    expect(screen.getByText('Visa Category of interest')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('displays error messages for empty required fields', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText('First Name is required')).toBeInTheDocument();
      expect(screen.getByText('Last Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Please select a country')).toBeInTheDocument();
      expect(screen.getByText('LinkedIn/Website URL is required')).toBeInTheDocument();
      expect(screen.getByText('Please provide some details')).toBeInTheDocument();
    });
  });
});
