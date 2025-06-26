### Prologue

hi, Alyssa! I hope you like the changes that I've made, and how I've approached everything. at a top level, please notice how my commits tell the story of the changes

in my first PR I started with fixing the foundational problems, errors, and best practice / style things that can (if anything can) be described as just plain wrong. I also made some changes that I'd strongly advocate for, like defining a type for Advocate and using it

in my second PR, I fixed the basics of querying the data. I figure this was more important than making the app pretty (if I didn't have time), because at scale, the current implementation would be extremely slow for initial load the entire list of advocates. I implemented the basics of filtering in the API, though I didn't get caught up on handling every field for the sake of time. I implemented debouncing, both for waiting for the input, and also making sure that if multiple results were in flight, the app only used the latest one. I used a general-purpose hook that I've already made for this purpose, `useAsyncEffect`

finally, in my third PR, I styled the site some. I used `styled-components`, because I like how it strongly links the styles with the elements. One quirk is that it did require me to extract a component from the layout, since I couldn't have both a `"use client"` and exported `metadata` in the same file. I'd love to talk more about the merits of `styled components` over something like Tailwind or SCSS

to go further, I'd configure linting with automatic formatting fixes when possible. I'd also continue to style the advocate list, which here I only styled to prevent horizontal overflow. and of course, the main thing I'd want to do is work with a designer to implement their spec to pixel perfection 💜

thanks for carefully considering my application!  for your convenience, here's a link to my resume: https://davidmcgrath.com/#resume
