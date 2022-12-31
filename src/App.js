import {
	Button,
	Container,
	Text,
	Title,
	Modal,
	TextInput,
	Group,
	Card,
	ActionIcon,
	Code,
} from '@mantine/core';
import { useState, useRef, useEffect } from 'react';
import { MoonStars, Sun, Trash } from 'tabler-icons-react';

import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [opened, setOpened] = useState(false);

	const preferredColorScheme = useColorScheme();
	const [colorScheme, setColorScheme] = useLocalStorage({
		key: 'mantine-color-scheme',
		defaultValue: 'light',
		getInitialValueInEffect: true,
	});
	const toggleColorScheme = value =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	useHotkeys([['mod+J', () => toggleColorScheme()]]);

	const taskTitle = useRef('');
	const taskSummary = useRef('');
	const timeStamp = useRef('');
	const dueDate = useRef('');
	const status = useRef('');

	// var currentdate = new Date();
	// var datetime = "Last Sync: " + currentdate.getDay() + "/" + currentdate.getMonth() 
	// + "/" + currentdate.getFullYear() + " @ " 
	// + currentdate.getHours() + ":" 
	// + currentdate.getMinutes() + ":" + currentdate.getSeconds();
	// console.log(currentdate);

	function createTask() {
		setTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
				timestamp: timeStamp.current.value,
				duedate: dueDate.current.value,
				status: status.current.value,
			},
		]);

		saveTasks([
			...tasks,
			{
				title: taskTitle.current.value,
				summary: taskSummary.current.value,
				timestamp: timeStamp.current.value,
				duedate: dueDate.current.value,
				status: status.current.value,
			},
		]);
	}

	function deleteTask(index) {
		var clonedTasks = [...tasks];

		clonedTasks.splice(index, 1);

		setTasks(clonedTasks);

		saveTasks([...clonedTasks]);
	}

	function loadTasks() {
		let loadedTasks = localStorage.getItem('tasks');

		let tasks = JSON.parse(loadedTasks);

		if (tasks) {
			setTasks(tasks);
		}
	}

	function saveTasks(tasks) {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	useEffect(() => {
		loadTasks();
	}, []);

	return (
		<ColorSchemeProvider
			colorScheme={colorScheme}
			toggleColorScheme={toggleColorScheme}>
			<MantineProvider
				theme={{ colorScheme, defaultRadius: 'md' }}
				withGlobalStyles
				withNormalizeCSS>
				<div className='App'>

					{/* Input Form */}

					<Modal
						opened={opened}
						size={'md'}
						title={'Your Task'}
						withCloseButton={false}
						onClose={() => {
							setOpened(false);
						}}
						centered>
						<TextInput
							mt={'md'}
							ref={taskTitle}
							placeholder={'Task Title'}
							required
							label={'Title'}
						/>
						<TextInput
							ref={taskSummary}
							mt={'md'}
							placeholder={'Task Summary'}
							label={'Summary'}
						/>
						<TextInput
							ref={timeStamp}
							mt={'md'}
							placeholder={'Time Stamp'}
							label={'Time Stamp'}
						/>
						<TextInput
							ref={dueDate}
							mt={'md'}
							placeholder={'Due Date'}
							label={'Due Date'}
						/>
						<TextInput
							ref={status}
							mt={'md'}
							placeholder={'Status'}
							label={'Status'}
						/>
						<Group mt={'md'} position={'apart'}>
							<Button
								onClick={() => {
									setOpened(false);
								}}
								variant={'subtle'}>
								Cancel
							</Button>
							<Button
								onClick={() => {
									createTask();
									setOpened(false);
								}}>
								Create Task
							</Button>
						</Group>
					</Modal>
					<Container size={550} my={40}>
						<Group position={'apart'}>
							<Title
								sx={theme => ({
									fontFamily: `Greycliff CF, ${theme.fontFamily}`,
									fontWeight: 900,
								})}>
								My Tasks
							</Title>
							<ActionIcon
								color={'blue'}
								onClick={() => toggleColorScheme()}
								size='lg'>
								{colorScheme === 'dark' ? (
									<Sun size={16} />
								) : (
									<MoonStars size={16} />
								)}
							</ActionIcon>
						</Group>
						{tasks.length > 0 ? (
							tasks.map((task, index) => {
								if (task.title) {
									return (
												// output

										<Card withBorder key={index} mt={'sm'}>
											<Group position={'apart'}>
												<Text className='h1' weight={'bold'}>{task.title}</Text> 
												<ActionIcon
													onClick={() => {
														deleteTask(index);
													}}
													color={'red'}
													variant={'transparent'}>
													<Trash />
												</ActionIcon>
												
											</Group>
											{/* <Text weight={'bold'}>{task.title}</Text> */}
											<Text weight={'bold'} size={'md'} mt={'sm'}>
												{task.summary
													?  task.summary
													: 'No summary was provided for this task'}
											</Text>
											<Text weight={'bold'} size={'md'} mt={'sm'}>
												{task.timestamp
													? task.timestamp
													: 'No Time Stamp was provided for this task'}
											</Text>
											<Text weight={'bold'} size={'md'} mt={'sm'}>
												{task.duedate
													? task.duedate
													: 'No Due Date was provided for this task'}
											</Text>
											<Text weight={'bold'} size={'md'} mt={'sm'}>
												{task.status
													? task.status
													: 'No status was provided for this task'}
											</Text>
											  
										</Card>
									);
								}
							})
						) : (
							<Text size={'lg'} mt={'md'} color={'dimmed'}>
								You have no tasks
							</Text>
						)}
						<Button
							onClick={() => {
								setOpened(true);
							}}
							fullWidth
							mt={'md'}>
							New Task
						</Button>
					</Container>
				</div>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}
