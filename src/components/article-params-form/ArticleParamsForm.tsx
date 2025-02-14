import { ArrowButton } from 'components/arrow-button';
import { Button } from '../button';
import { useState, useRef, useEffect } from 'react';
import { Text } from '../text';
import { Select } from '../select';
import { RadioGroup } from '../../components/radio-group';
import { Separator } from '../../components/separator';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	ArticleStateType,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	setArticleState: (items: ArticleStateType) => void;
};

export const ArticleParamsForm = ({setArticleState,}: ArticleParamsFormProps)  => {
	const rootRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	
	const updateFormState = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState((prev) => ({ ...prev, [key]: value }));
	};
	
	const submitForm = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Форма отправлена:", formState);
		setArticleState(formState);
	};
	
	const resetForm = () => {
		setFormState(defaultArticleState);
		setArticleState(defaultArticleState);
	};
	
	useOutsideClickClose({
		isMenuOpen,
		rootRef,
		onClose: () => setIsMenuOpen(false),
		onChange: setIsMenuOpen,
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={toggleMenu} isOpen={isMenuOpen} />
			<aside className={clsx(styles.container, { [styles.container_open]: isMenuOpen })}>
				<form className={styles.form} onSubmit={submitForm}>
					<Text as="h2" size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => updateFormState("fontFamilyOption", value)}
						title="Шрифт"
					/>
					<RadioGroup
						name="fontSize"
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) => updateFormState("fontSizeOption", value)}
						title="Размер шрифта"
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => updateFormState("fontColor", value)}
						title="Цвет шрифта"
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => updateFormState("backgroundColor", value)}
						title="Цвет фона"
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => updateFormState("contentWidth", value)}
						title="Ширина контента"
					/>
					<div className={styles.bottomContainer}>
						<Button title="Сбросить" type="clear" onClick={resetForm} />
						<Button title="Применить" type="apply" />
					</div>
				</form>
			</aside>
		</div>
	);
};