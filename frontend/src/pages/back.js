


// https://www.google.com/search?q=pixabay%20bussiness%20professional%20qualities%20images&hl=en&tbs=rimg:CWSwujvwRSusYY9eR3gW2l4ysgIAwAIA2AIA4AIA&udm=2&sa=X&ved=0CBsQuIIBahcKEwjQzejr1P2GAxUAAAAAHQAAAAAQDQ&biw=1366&bih=641&dpr=1#vhid=Gnu_yBiOFhyqIM&vssid=mosaic
// unique images link






      {/* Right side with text and button */}
      <Flex flex="1" direction="column" p={8} minH={minHeight}>
        <Text
          fontSize="12.5px"
          color="#5ea51d"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          fontWeight="800"
        >
          Our Special
        </Text>
        <Text
          fontSize={["16px", "24px", "30px", "36px"]}
          color="#000000CC"
          fontFamily="'Nunito Sans', Arial, sans-serif"
          mb={6}
        >
          What makes us unique from others
        </Text>
        <Text fontSize="lg" color="gray.600" mb={8}>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li>Exceptional customer service</li>
            <li>Unparalleled market expertise</li>
            <li>Dedication to finding the perfect property</li>
            <li>Experienced professionals staying ahead of market trends</li>
            <li>Innovative solutions and personalized service</li>
            <li>
              Building lasting relationships grounded in trust, integrity, and
              transparency
            </li>
          </ul>
        </Text>
        <Button
          as={Link}
          to="/about"
          bg="#5ea51d"
          size="md"
          mt="auto"
          width="200px"
        >
          Read more
        </Button>
      </Flex>