/**
 * Form and Input Validation
 * Strict rules: No fake simulated backend successes. Clean validation.
 */

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateContactMessage(values: {
  name: string;
  topic: string;
  message: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please provide your name (at least 2 characters).';
  }

  if (!values.topic || values.topic.trim().length < 3) {
    errors.topic = 'Please specify a discussion topic.';
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Please enter a message of at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateProjectSubmission(values: {
  title: string;
  tagline: string;
  githubUrl: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  if (!values.title || values.title.trim().length < 3) {
    errors.title = 'Project title is required (at least 3 characters).';
  }

  if (!values.tagline || values.tagline.trim().length < 10) {
    errors.tagline = 'Please provide a short description (at least 10 characters).';
  }

  if (!values.githubUrl || !values.githubUrl.includes('github.com')) {
    errors.githubUrl = 'A valid GitHub repository URL is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
