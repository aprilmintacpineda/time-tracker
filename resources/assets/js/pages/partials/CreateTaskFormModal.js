import React from 'react';
import { connect } from 'react-redux';
// components
import Button from '../../components/forms/Button';
import InputText from '../../components/forms/InputText';
import InputTextArea from '../../components/forms/InputTextArea';
import Modal from '../../components/Modal';
import Icon from '../../components/Icon';
// actions
import {
  fieldToggle as createTaskToggle,
  titleChange,
  descriptionChange,
  fieldAdd,
  fieldRemove,
  submit,
  clearFetch
} from '../../redux/create_tasks/actions';

class CreateTaskFormModal extends React.Component {
  render() {
    return (
      this.props.create_tasks.shown || (this.props.create_tasks.fetch.status != null && this.props.create_tasks.fetch.message)?
        <Modal dismiss={this.props.createTaskToggle} allowDismiss={!this.props.create_tasks.fetch.sending}>
          {
            this.props.create_tasks.fetch.status == 500 && this.props.create_tasks.fetch.message
            ? <div>
                <h1 className="title">Failed to create task</h1>
                <div>{this.props.create_tasks.fetch.message}</div>
                <br/>
                <Button
                  text="Go back"
                  icon="back"
                  onClick={this.props.clearFetch}
                  disabled={false}
                  loading={false}
                />
              </div>
            : this.props.create_tasks.fetch.status == 200 && this.props.create_tasks.fetch.message?
              <div>
                <h1 className="title">{this.props.create_tasks.fetch.message}</h1>
                <br/>
                <ul className="in-line-ul">
                  <li>
                    <Button
                      text="Add more"
                      icon="plus"
                      onClick={this.props.clearFetch}
                      disabled={false}
                      loading={false}
                    />
                  </li>
                  <li>
                    <Button
                      text="Close"
                      icon="close"
                      onClick={() => {
                        this.props.createTaskToggle();
                        this.props.clearFetch();
                      }}
                      disabled={false}
                      loading={false}
                    />
                  </li>
                </ul>
              </div>
            : <div>
                <h1 className="title">Create Task</h1>
                <div className="new-task-fields-wrapper">
                  {this.props.create_tasks.fields.map((field, field_index) =>
                    <div className="new-task-field" key={field_index}>
                      <table>
                      <tbody>
                        <tr>
                          <td>
                            <InputText
                              label="Task Title"
                              placeholder="E.g. Grow a pair of wings"
                              size="long"
                              onChange={v => this.props.titleChange(v, field_index)}
                              errors={field.title.errors}
                              value={field.title.value}
                              disabled={this.props.create_tasks.fetch.sending}
                            />
                          </td>
                          <td>
                            <InputText
                              label="Task Description"
                              placeholder="E.g. Because heavy traffic is real."
                              optional={true}
                              size="long"
                              onChange={v => this.props.descriptionChange(v, field_index)}
                              errors={field.description.errors}
                              value={field.description.value}
                              disabled={this.props.create_tasks.fetch.sending}
                            />
                          </td>
                          {
                            !this.props.create_tasks.fetch.sending && (field_index != 0 || this.props.create_tasks.fields.length > 1)?
                              <td className="remove-field-button">
                                <span className="remove-field">
                                  <a
                                    className="danger-color"
                                    onClick={() => this.props.fieldRemove(field_index)}
                                  ><Icon icon="circled-close" standAlone={true} /></a>
                                </span>
                              </td>
                            : null
                          }
                        </tr>
                      </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <br/>
                <ul className="in-line-ul">
                  <li>
                    <Button
                      text="Create task(s)"
                      icon="send"
                      onClick={this.props.submit}
                      disabled={!this.props.create_tasks.fetch.sending && this.props.create_tasks.fetch.allow? false : true}
                      loading={this.props.create_tasks.fetch.sending}
                    />
                  </li>
                  <li>
                    <Button
                      text="More field"
                      icon="plus"
                      onClick={this.props.fieldAdd}
                      disabled={this.props.create_tasks.fetch.sending}
                      loading={false}
                    />
                  </li>
                </ul>
              </div>
          }
          <div>
          </div>
        </Modal>
      : null
    );
  }
}

export default connect(store => ({
  create_tasks: { ...store.create_tasks }
}), {
  createTaskToggle,
  titleChange,
  descriptionChange,
  fieldAdd,
  fieldRemove,
  submit,
  clearFetch
})(CreateTaskFormModal);