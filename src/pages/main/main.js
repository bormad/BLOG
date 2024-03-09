import React from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination, Search } from './components';
import { getLastPage } from './utils/get-last-page';
import { debounce } from './utils/debounce';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [lastPage, setLastPage] = React.useState(1);
	const [shouldSearch, setShouldSearch] = React.useState(false);
	const [searchPhrase, setSearchPhrase] = React.useState('');
	const requestServer = useServerRequest();

	React.useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, 9).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPage(links));
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, requestServer, shouldSearch]);

	const startDelayedSearch = React.useMemo(
		() => debounce(setShouldSearch, 2000),
		[]
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length ? (
				<div className='post-list'>
					{posts.map(({ id, title, publishedAt, imageUrl, commentsCount }) => (
						<PostCard
							id={id}
							key={id}
							imageUrl={imageUrl}
							title={title}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
						/>
					))}
				</div>
			) : (
				<div>Ничего не найдено</div>
			)}
			{lastPage > 1 && (
				<Pagination setPage={setPage} lastPage={lastPage} page={page} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	padding: 20px 10px;
	& .post-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;
	}
`;
