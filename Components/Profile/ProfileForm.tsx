import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import classes from './profile.module.scss'
import { useInputs } from '../../customHooks/useInputs'

const initialInputs = {
    firstName: '',
    lastName: '',
    email: '',
}

function ProfileForm() {
    const [inputs, handleInputsChange] = useInputs(initialInputs)

    const formItems = [
        {
            type: 'input',
            label: 'First name',
            name: 'firstName',
            value: '',
        },
        {
            type: 'input',
            label: 'Last name',
            name: 'lastName',
            value: '',
        },
        {
            type: 'input',
            label: 'Email',
            name: 'email',
            value: '',
            htmlType: 'email'
        },
        {
            type: 'input',
            label: 'Your bio',
            name: 'bio',
            multiline: true,
            rows: 3
        }

    ]

    return (
        <form className={classes.form} autoComplete="off">
            {
                formItems.map(item => {
                    const { type, label, name, htmlType, multiline, rows } = item
                    return <FormControl key={name} fullWidth>
                        <FormLabel>{label}</FormLabel>
                        {
                            type === 'input'
                                ? <TextField
                                    value={inputs[name]}
                                    onChange={handleInputsChange}
                                    name={name}
                                    type={htmlType || 'text'}
                                    size="small"
                                    placeholder={`Enter your ${label} here`}
                                    multiline={multiline}
                                    rows={rows || 1}
                                />
                                : <h3>Type not handled</h3>
                        }
                    </FormControl>
                })
            }
        </form>
    )
}

export default ProfileForm