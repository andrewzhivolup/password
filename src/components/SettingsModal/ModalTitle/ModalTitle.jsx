import { AdvancedModeSwitch } from '../AdvancedModeSwitch';
import cls from './ModalTitle.module.scss';

function ModalTitle(props) {
    const { title } = props;

    return (
        <div className={cls.ModalTitle}>
            {title} <AdvancedModeSwitch />
        </div>
    );
}

export default ModalTitle;
