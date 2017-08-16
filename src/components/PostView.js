import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';
import Comments from './Comments';
import { deletePost, getComments, getPost } from '../actions';

class PostView extends Component {

  componentDidMount() {
    // Read the id of the post to load from the URL
    const { postID } = this.props.match.params;

    if (postID) {
      // Load the post from back end
      this.props.getPost(postID);
      this.props.getComments(postID);
    }
  }

  onSubmit(values) {
    // Check wether we want to update or delete a post
    if (values.isDelete) {
      deletePost(values.id);
      // Navigate to the main page after deleting the post
      this.props.history.push('/');
    }
  }

  render() {
    // "handleSubmit" comes from redux-form
    const { handleSubmit } = this.props;
    const postID = this.props.initialValues.id;

    return (
      <div>
        {/* <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}> */}
        <Form reply >
          <Form.Field>
            <label>Title</label>
            <div>
              <Field
                name="title"
                component="input"
                type="text"
                placeholder="First Name"
              />
            </div>
          </Form.Field>
          <Form.Field>
            <label>Body</label>
            <div>
              <Field name="body" component="textarea" />
            </div>
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <div>
              <Field
                name="author"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </Form.Field>
          <Form.Field disabled>
            <label>Timestamp</label>
            <div>
              <Field
                name="timestamp"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </Form.Field>
          <Form.Field>
            <label>Score</label>
            <div>
              <Field
                name="voteScore"
                component="input"
                type="text"
                placeholder="Last Name"
              />
            </div>
          </Form.Field>
          <Form.Group>
            <Form.Button
              primary
              icon="save"
              content="Save"
              onClick={handleSubmit((values) => {
                return this.onSubmit({
                  ...values,
                  isDelete: false,
                });
              })}
            />
            <Form.Button
              color="red"
              icon="delete"
              content="Delete"
              onClick={handleSubmit((values) => {
                return this.onSubmit({
                  ...values,
                  isDelete: true,
                });
              })}
            />
          </Form.Group>
        </Form>
        <Comments postID={postID} />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validate that all fields are filled
  // if (!values.title) {
  //   errors.title = 'Enter a post title';
  // }
  // if (!values.categories) {
  //   errors.body = 'Enter a body';
  // }
  // if (!values.content) {
  //   errors.author = 'Enter a author';
  // }

  // Returning an empty errors objects means, that the validation was successful
  // If errors is not empty (has ANY properties) the form will not be submitted
  return errors;
}

function mapStateToProps(state) {
  return ({
    post: state.post,
    initialValues: state.post, // Fill the initialValues for the form
    viewState: state.viewState,
  });
}

/**
 * Hook everything up. It is important to first call "connect" and only than "reduxForm". Otherwise
 * setting "initialValues" will not work!
 */
export default connect(mapStateToProps, { getComments, getPost })(reduxForm({
  validate,
  form: 'PostForm', // a unique identifier for this form
  enableReinitialize: true,
})(PostView));
