import styled from 'styled-components';
import { Input } from '../../../components';
import { Icon } from '../../../components/header/components/icon';
import { SpecialPanel } from './special-panel';
import React from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../hooks';
import { savePostAsync } from '../../../actions';
import { useNavigate } from 'react-router-dom';
const PostFormContainer = ({ className, post }) => {
	const { id, content, imageUrl, title, publishedAt } = post;
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const imageRef = React.useRef(null);
	const titleRef = React.useRef(null);
	const contentRef = React.useRef(null);

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				postId: id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent
			})
		).then(({ id }) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={imageUrl}
				placeholder='Изображение...'
			/>
			<Input ref={titleRef} defaultValue={title} placeholder='Заголовок...' />
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin={'15px 0'}
				editBnt={<Icon size='20px' id='fa-floppy-o' onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className='post-text'
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .post-text {
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid #000;
	}
`;
