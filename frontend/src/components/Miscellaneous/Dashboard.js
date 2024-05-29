import React from 'react';
import { Box, Container, Heading, SimpleGrid, useBreakpointValue } from '@chakra-ui/react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const barData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Determine the number of columns dynamically based on screen size
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  return (
    <Container maxW="container.xl" p={4}>
      <Heading as="h2" size="xl" mb={4}>
        Dashboard
      </Heading>
      <SimpleGrid columns={columns} spacing={4}>
        <ChartBox title="Bar Chart" data={barData} type="bar" />
        <ChartBox title="Line Chart" data={lineData} type="line" />
        <ChartBox title="Pie Chart" data={pieData} type="pie" />
      </SimpleGrid>
    </Container>
  );
};

const ChartBox = ({ title, data, type }) => (
  <Box
    boxShadow="md"
    p={3}
    rounded="md"
    bg="white"
    width="100%"
    minWidth="0" // Ensure minWidth 0 to prevent overflow on small screens
    height="200px" // Set a smaller height for the chart container
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Heading as="h3" size="sm" mb={2} textAlign="center">
      {title}
    </Heading>
    <Box width="100%" height="100%" position="relative">
      {type === 'bar' && <Bar data={data} options={{ maintainAspectRatio: false }} />}
      {type === 'line' && <Line data={data} options={{ maintainAspectRatio: false }} />}
      {type === 'pie' && <Pie data={data} options={{ maintainAspectRatio: false }} />}
    </Box>
  </Box>
);

export default Dashboard;
