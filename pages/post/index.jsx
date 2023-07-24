import React, { useState } from 'react';
import Head from 'next/head';
import { Box, Container, VStack, Text, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import Editor from '../../components/Editor';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useToast } from '@chakra-ui/react';

const createPost = () => {
  const toast = useToast();
  const session = useSession();
  const { register, watch, handleSubmit } = useForm();
  const [body, setBody] = useState('');

  const handleChange = (data) => {
    setBody(data);
  };

  const onSubmit = async () => {
    const data = {
      authorId: session.data.user.id,
      title: watch('title'),
      body: body,
    };

    await saveData(data);
    toast({
      title: 'Post Success.',
      description: "You've created your post.",
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom-left',
    });
  };
  return (
    <>
      <Head>
        <title>Create Articels </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="1366px" position="relative" my={['5', 5, '10']}>
        <VStack justifyContent="normal" alignItems="normal" marginX="3" spacing={4}>
          <Box>
            <Text fontWeight="bold" fontSize="2xl">
              Create Post!
            </Text>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  {...register('title')}
                  type="title"
                  colorScheme="whiteAlpha"
                  placeholder="Type intresting title "
                  bg={'#303030'}
                  border={'none'}
                  outline={'none'}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Content</FormLabel>
                <Editor onChange={handleChange} isParent={true} description={'Type your content'} />
              </FormControl>
            </VStack>

            <Box marginTop={3}>
              <Button type="submit" colorScheme="facebook">
                Submit
              </Button>
            </Box>
          </form>
        </VStack>
      </Container>
    </>
  );
};

export default createPost;

export async function saveData(data) {
  const response = await fetch('/api/post/create', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json;
}
