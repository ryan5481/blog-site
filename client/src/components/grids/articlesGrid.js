'use client'

import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  Grid,
} from '@chakra-ui/react'

interface IBlogTags {
  tags: Array<string>,
  marginTop?: SpaceProps['marginTop']
}

interface Props {
  marginTop?: number,
  tags: any[]
}

const BlogTags = (props: Props) => {
  const { marginTop = 0, tags } = props

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        )
      })}
    </HStack>
  )
}

interface BlogAuthorProps {
  date: Date,
  name: string
}

const BlogAuthor = (props: BlogAuthorProps) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  )
}

const ArticlesGrid = (data) => {

  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1">Latest Stories</Heading>
      {/* <Heading as="h2" marginTop="5">
        Latest articles
      </Heading> */}
      <Divider marginTop="5" />
      <Grid templateColumns={{ sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr', xl: '1fr 1fr 1fr'}} gap={10} >
      {data && data.data.map((article, index) => {
        return (<>
          <Wrap spacing="30px" marginTop="5" p={5} >
            <WrapItem width={{ base: '100%', sm: '95%', md: '95%', lg: '95%' }} >
              <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                  <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    <Image
                      transform="scale(1.0)"
                      src={require(`../../uploads/articleImages/${article.heroImage}`)}
                      alt="some text"
                      objectFit="fill"
                      width="100%"
                      h={"200px"}
                      transition="0.3s ease-in-out"
                      _hover={{
                        transform: 'scale(1.05)',
                      }}
                    />
                  </Box>
                </Box>
                <BlogTags tags={['Engineering', 'Product']} marginTop={3} />
                <Heading fontSize="xl" marginTop="2">
                  <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                    {article.title}
                  </Text>
                </Heading>
                <Text as="p" fontSize="md" marginTop="2">
                  {article.subTitle}
                </Text>
                <BlogAuthor name={article.author} date={new Date(article.createdAt)} />
              </Box>
            </WrapItem>
          </Wrap>
        </>)
      })
      }
      </Grid>

      {/* <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
        <Heading as="h2">What we write about</Heading>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
          arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
          Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
          commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
          Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
          arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
          Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
          commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
          Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
        <Text as="p" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum quam
          arcu, eu tempus tortor molestie at. Vestibulum pretium condimentum dignissim.
          Vestibulum ultrices vitae nisi sed imperdiet. Mauris quis erat consequat,
          commodo massa quis, feugiat sapien. Suspendisse placerat vulputate posuere.
          Curabitur neque tortor, mattis nec lacus non, placerat congue elit.
        </Text>
      </VStack> */}
    </Container>
  )
}

export default ArticlesGrid