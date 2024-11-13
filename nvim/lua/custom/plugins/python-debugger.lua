return {
  'mfussenegger/nvim-dap-python',
  config = function()
    local pythondap = require 'dap-python'
    pythondap.setup '~/.virtualenvs/debugpy/bin/python'
  end,
}
