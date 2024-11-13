function storage()
  local chatconf = {
    'CopilotC-Nvim/CopilotChat.nvim',
    branch = 'canary',
    dependencies = {
      { 'zbirenbaum/copilot.lua' }, -- or github/copilot.vim
      { 'nvim-lua/plenary.nvim' }, -- for curl, log wrapper
    },
    opts = {
      debug = true, -- Enable debugging
      context = 'buffers',
      -- See Configuration section for rest
    },
    -- See Commands section for default commands if you want to lazy load on them
  }
  return chatconf
end

return storage()
