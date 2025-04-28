import cls from './ButtonsBlock.module.scss';

function ButtonsBlock(props) {
    const { children } = props;

    return <div className={cls.ButtonBlock}>{children}</div>;
}

export default ButtonsBlock;
