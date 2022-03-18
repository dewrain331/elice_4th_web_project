import { useState } from 'react'
import { Form, FormGroup } from 'react-bootstrap'

const CommentAddForm=({ userId, setComments })=>{
    const 
    return(
        <Form>
            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>댓글을 작성해주세요!</ControlLabel>
                <FormControl componentClass="textarea" placeholder="댓글을 작성해주세요" />
            </FormGroup>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default CommentAddForm