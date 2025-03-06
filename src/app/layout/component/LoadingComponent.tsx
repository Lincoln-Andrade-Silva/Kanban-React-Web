import { observer } from 'mobx-react-lite';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    content?: string;
}

export default observer(function LoadingComponent({ content }: Props) {
    return (
        <Dimmer active={true} className="loading-component">
            <Loader size='huge' indeterminate content={content} />
        </Dimmer>
    )
})