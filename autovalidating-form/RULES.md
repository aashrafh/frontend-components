# Form Rules

<strong>Important Note</strong>: This form inspired by the Gmail's sign up from

- Name: A non-empty​ string of alpha characters
  - Validate after the cursor no longer in the field
- Username: A string of characters which are either numbers, letters, periods, or underscores.
  - Validate after the cursor no longer in the field
- Password: A string of alphanumeric characters greater than length 6
  - Validate as typed
  - Rated by the following:
    - Weak: Less than 6 length
    - Fair: Greater than 6 length
    - Good: Greater than 6 length and has a mix of letters and numbers
- Birthday: Numbers
  - Validate after the cursor no longer in the field
  - Extra guidance provided by:
    - inability to continue typing past character limit (2 for day, 4 for year)
    - inability to type non-numeric characters (typing ‘a’ does nothing)
- Phone number: Numbers with hyphens and parentheses
  - Parentheses can only surround the initial set of numbers
  - Hyphens must appear between numbers
- Current email address: String of ASCII characters with @ and . existing between any characters (can’t be at the beginning or end)​
